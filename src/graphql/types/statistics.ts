import builder from "../builder";
// Define TypeScript interfaces for our custom objects.
interface MaxExpenseDayType {
  date: string;
  amount: number;
}

interface CategorySummaryType {
  categoryName: string;
  totalSpent: number;
}

interface AccountSummaryType {
  accountName: string;
  total: number;
}

interface DailyTotalSummaryType {
  date: string;
  totalExpenses: number;
  totalIncome: number;
}

interface StatisticsType {
  totalExpenses: number;
  totalIncome: number;
  maxExpenseDay: MaxExpenseDayType | null;
  topExpenseCategory: CategorySummaryType | null;
  topExpenseAccount: AccountSummaryType | null;
  topIncomeAccount: AccountSummaryType | null;
  dailyTotals: DailyTotalSummaryType[];
}

// Define the object types with explicit generics.

const MaxExpenseDayObj = builder.objectRef<MaxExpenseDayType>("MaxExpenseDay");
MaxExpenseDayObj.implement({
  fields: (t) => ({
    date: t.string({ resolve: (parent) => parent.date }),
    amount: t.float({ resolve: (parent) => parent.amount }),
  }),
});

const CategorySummaryObj =
  builder.objectRef<CategorySummaryType>("CategorySummary");
CategorySummaryObj.implement({
  fields: (t) => ({
    categoryName: t.string({ resolve: (parent) => parent.categoryName }),
    totalSpent: t.float({ resolve: (parent) => parent.totalSpent }),
  }),
});

const AccountSummaryObj =
  builder.objectRef<AccountSummaryType>("AccountSummary");
AccountSummaryObj.implement({
  fields: (t) => ({
    accountName: t.string({ resolve: (parent) => parent.accountName }),
    total: t.float({ resolve: (parent) => parent.total }),
  }),
});

const DailyTotalSummaryObj =
  builder.objectRef<DailyTotalSummaryType>("DailyTotalSummary");
DailyTotalSummaryObj.implement({
  fields: (t) => ({
    date: t.string({ resolve: (parent) => parent.date }),
    totalExpenses: t.float({ resolve: (parent) => parent.totalExpenses }),
    totalIncome: t.float({ resolve: (parent) => parent.totalIncome }),
  }),
});

const StatisticsObj = builder.objectRef<StatisticsType>("Statistics");
StatisticsObj.implement({
  fields: (t) => ({
    totalExpenses: t.float({ resolve: (parent) => parent.totalExpenses }),
    totalIncome: t.float({ resolve: (parent) => parent.totalIncome }),
    maxExpenseDay: t.field({
      type: MaxExpenseDayObj,
      nullable: true,
      resolve: (parent) => parent.maxExpenseDay,
    }),
    topExpenseCategory: t.field({
      type: CategorySummaryObj,
      nullable: true,
      resolve: (parent) => parent.topExpenseCategory,
    }),
    topExpenseAccount: t.field({
      type: AccountSummaryObj,
      nullable: true,
      resolve: (parent) => parent.topExpenseAccount,
    }),
    topIncomeAccount: t.field({
      type: AccountSummaryObj,
      nullable: true,
      resolve: (parent) => parent.topIncomeAccount,
    }),
    dailyTotals: t.field({
      type: [DailyTotalSummaryObj],
      resolve: (parent) => parent.dailyTotals,
    }),
  }),
});

builder.queryField("statistics", (t) =>
  t.field({
    type: StatisticsObj,
    args: {
      userId: t.arg.int({ required: true }),
      from: t.arg.string({ required: true }), // Use ISO string dates
      to: t.arg.string({ required: true }),
    },
    resolve: async (_root, { userId, from, to }) => {
      const fromDate = new Date(from).toISOString();
      const toDate =
        new Date(to).toISOString() || new Date(Date.now()).toISOString();
      console.log(Date.now());
      console.log(fromDate);
      console.log(toDate);

      // Fetch records for expenses and incomes.
      const [expenses, incomes] = await Promise.all([
        prisma.record.findMany({
          where: {
            userId,
            type: "EXPENSE",
            createdAt: { gte: fromDate, lte: toDate },
          },
          include: {
            category: true,
            account: true,
          },
        }),
        prisma.record.findMany({
          where: {
            userId,
            type: "INCOME",
            createdAt: { gte: fromDate, lte: toDate },
          },
          include: {
            category: true,
            account: true,
          },
        }),
      ]);

      // 1. Compute overall totals:
      const totalExpenses = expenses.reduce((sum, rec) => sum + rec.amount, 0);
      const totalIncome = incomes.reduce((sum, rec) => sum + rec.amount, 0);

      // 2. Group expenses by day.
      const expensesPerDay = expenses.reduce((acc, rec) => {
        const day = rec.createdAt.toISOString().split("T")[0];
        acc[day] = (acc[day] || 0) + rec.amount;
        return acc;
      }, {} as Record<string, number>);
      let maxExpenseDay: MaxExpenseDayType | null = null;
      for (const day in expensesPerDay) {
        if (!maxExpenseDay || expensesPerDay[day] > maxExpenseDay.amount) {
          maxExpenseDay = { date: day, amount: expensesPerDay[day] };
        }
      }

      // 3. Group expenses by category.
      const expensesByCategory = expenses.reduce((acc, rec) => {
        const cat = rec.category.name;
        acc[cat] = (acc[cat] || 0) + rec.amount;
        return acc;
      }, {} as Record<string, number>);
      let topExpenseCategory: CategorySummaryType | null = null;
      for (const cat in expensesByCategory) {
        if (
          !topExpenseCategory ||
          expensesByCategory[cat] > topExpenseCategory.totalSpent
        ) {
          topExpenseCategory = {
            categoryName: cat,
            totalSpent: expensesByCategory[cat],
          };
        }
      }

      // 4. Group expenses by account.
      const expensesByAccount = expenses.reduce((acc, rec) => {
        const accName = rec.account.name;
        acc[accName] = (acc[accName] || 0) + rec.amount;
        return acc;
      }, {} as Record<string, number>);
      let topExpenseAccount: AccountSummaryType | null = null;
      for (const accName in expensesByAccount) {
        if (
          !topExpenseAccount ||
          expensesByAccount[accName] > topExpenseAccount.total
        ) {
          topExpenseAccount = {
            accountName: accName,
            total: expensesByAccount[accName],
          };
        }
      }

      // 5. Group incomes by account.
      const incomesByAccount = incomes.reduce((acc, rec) => {
        const accName = rec.account.name;
        acc[accName] = (acc[accName] || 0) + rec.amount;
        return acc;
      }, {} as Record<string, number>);
      let topIncomeAccount: AccountSummaryType | null = null;
      for (const accName in incomesByAccount) {
        if (
          !topIncomeAccount ||
          incomesByAccount[accName] > topIncomeAccount.total
        ) {
          topIncomeAccount = {
            accountName: accName,
            total: incomesByAccount[accName],
          };
        }
      }

      // 6. Calculate daily totals.
      const dailyTotalsMap: Record<
        string,
        { totalExpenses: number; totalIncome: number }
      > = {};
      expenses.forEach((rec) => {
        const day = rec.createdAt.toISOString().split("T")[0];
        if (!dailyTotalsMap[day]) {
          dailyTotalsMap[day] = { totalExpenses: 0, totalIncome: 0 };
        }
        dailyTotalsMap[day].totalExpenses += rec.amount;
      });
      incomes.forEach((rec) => {
        const day = rec.createdAt.toISOString().split("T")[0];
        if (!dailyTotalsMap[day]) {
          dailyTotalsMap[day] = { totalExpenses: 0, totalIncome: 0 };
        }
        dailyTotalsMap[day].totalIncome += rec.amount;
      });

      let totalIncomeAndExpense = totalIncome + totalExpenses;
      const dailyTotals: DailyTotalSummaryType[] = Object.keys(dailyTotalsMap)
        .map((day) => ({
          date: day,
          ...dailyTotalsMap[day],
        }))
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

      return {
        totalExpenses:
          totalIncomeAndExpense == 0
            ? 0
            : (totalExpenses / totalIncomeAndExpense) * 100,
        totalIncome:
          totalIncomeAndExpense == 0
            ? 0
            : (totalIncome / totalIncomeAndExpense) * 100,
        maxExpenseDay,
        topExpenseCategory,
        topExpenseAccount,
        topIncomeAccount,
        dailyTotals,
      };
    },
  })
);
