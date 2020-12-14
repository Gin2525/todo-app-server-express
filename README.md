# todo-app-server-express

1. setting DB (MySQL)

    `$ sudo mysql.server start`

    `$ mysql -u root -p`

    in mysql console

    ```
    CREATE DATABASE todo_app;
    CREATE TABLE todo(
        id int NOT NULL PRIMARY KEY,
        text varchar(10) NOT NULL,
        done tinyint(1) NOT NULL
    );

    INSERT INTO todo(id,text,done) VALUES(0,'aaa',0);
    INSERT INTO todo(id,text,done) VALUES(1,'bbb',1);
    INSERT INTO todo(id,text,done) VALUES(2,'ccc',0);
    ```

    expresssの実装？の問題で以下も必要
    
    https://qiita.com/monga3/items/6583c07a9b275b469608
    
    `ALTER USER '<your-username>'@'localhost' IDENTIFIED WITH mysql_native_password BY '<your-password>'`

2. clone this repository

3. `$ ts-node app.ts` in this local repository directory

4. access to this link

    https://todo-app-react-698ed.web.app/
