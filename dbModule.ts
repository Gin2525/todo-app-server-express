import { connect } from "http2";

const mysql = require("mysql")

export const SQL_ALL_SELECT = "SELECT * FROM todo ORDER BY id ASC";
export type Item = {
    key: number,
    text: string,
    done: boolean
};

type ItemForQuery = {
    id: number,
    text: string,
    done: number
}

const parseInt = (b: boolean): number => b === true ? 1 : 0;

export function convertItemForQuery(item: Item) :ItemForQuery {
    return {
        id: item.key,
        text: item.text,
        done: parseInt(item.done)
    }
}


function mysqlBegin() {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'todo_app',
    });

    connection.connect((err: any) => {
        if (err) {
            console.log('error connecting:' + err.stack);
            return;
        }
        console.log('success');
    })

    return connection;
}
export default mysqlBegin;