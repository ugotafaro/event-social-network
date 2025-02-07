# Event Social Network

**1. Clone the git repository**

```bash
git clone https://github.com/ugotafaro/event-social-network
```

**2. Create a .env file at the root of backend folder**

```
RABBITMQ_HOST= rabbitmq
RABBITMQ_PORT= 5672
JWT_SECRET="your_jwt_secret"
DATABASE_NAME="sne-db"
DATABASE_URI="mongodb+srv://utafaro:root@cluster0.cwj57.mongodb.net/"
```

**3. Run the docker-compose**

```
docker-compose build
```

```
docker-compose up
```

## UML

![Texte alternatif](./Frame%201.png)

![Texte alternatif](./Frame%202.png)


