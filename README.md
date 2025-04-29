## Getting Started

Please follow this steps to start the website:

- first you need to put this as your secrets for .env (for local testing)

```.env
DATABASE_URL="postgres://moneyger:moneyger@127.0.0.1:5432/moneyger_db"
API_URL=/api/graphql
NEXT_PUBLIC_APU_URL=/api/graphql
SESSION_SECRET=lzaM1L/pcJ/KO0nb2FbaJziLp/y/9kMb5ulFGkippR4=
```

you can change the database url by changing the values in docker-compose file

- git clone https://github.com/AliSaleemHasan/Moneyger.git
- cd moneyger
- npm i --force
- docker-compose up (to start database and pg-admin containers)
- npx prisma migrate div --name init --schema /src/prisma/schema.prisma
- open http://localhost:3000 on your browser

Note: This website is not finished yet, due to some reasons, this is the following TODO list:

1. Create a better statistics (get from backend)
2. Involve the date time picker to show statistics on chosen time
3. close dialogs after submitting (after creating category or account)
4. better error handling
5. better loading UI
6. deploy to versel
7. add docker image for next application and link it with docker compose
