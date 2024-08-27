import { Client } from "@libsql/client";

type Bool<T> = {
  [P in keyof T]?: boolean | "SUM" | "COUNT" | "AVG" | "MAX" | "MIN";
};

type Condition = {
  query: string;
  operator?: "AND" | "OR";
};
export default class TursoORM<T extends Object> {
  private _table: string;
  private _connection: Client;
  private query: string;
  private whereList: Condition[];

  constructor(connection: Client, table: string) {
    this._table = table;
    this._connection = connection;
    this.query = "";
    this.whereList = [];
  }

  private stringfyValues(values: any[]) {
    return values.reduce(
      (acc, value) =>
        typeof value === "string" ? `${acc},'${value}'` : `${acc},${value}`,
      ""
    );
  }

  async run(query?: string) {
    if (
      !this.query.includes("WHERE") &&
      !this.query.startsWith("INSERT INTO")
    ) {
      this.query +=
        " WHERE " +
        this.whereList[0].query +
        this.whereList
          .slice(1)
          .map(
            (condition) => `${condition.operator || "AND"} ${condition.query}`
          )
          .join(" ");
    }
    return this._connection.execute(query || this.query + ";");
  }

  create(data: T) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    this.query = `INSERT INTO ${this._table} ("${this.stringfyValues(
      keys
    )}") VALUES (${this.stringfyValues(values)})`;
    return this;
  }

  createMany(data: T[]) {
    const keys = Object.keys(data[0]);
    const valuesList = data.map((item) => Object.values(item));
    this.query = `INSERT INTO ${this._table} ("${this.stringfyValues(
      keys
    )}") VALUES ${valuesList
      .map((values) => `(${this.stringfyValues(values)})`)
      .join(",")}`;
    return this;
  }

  update(data: Partial<T>) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    this.query = `UPDATE ${this._table} SET ${keys
      .map((key, i) => `"${key}"=${values[i]}`)
      .join(",")}`;
    return this;
  }

  delete() {
    this.query = `DELETE FROM ${this._table}`;
    return this;
  }

  find(data: Bool<T>) {
    const keys = Object.entries(data)
      .filter(([_, value]) => value !== false)
      .map(([key, v]) => (v == true ? key : `${v}(${key})`));

    this.query = `SELECT ${!!keys.length ? keys.join(",") : "*"} FROM ${
      this._table
    }`;
    return this;
  }

  where(
    prop: keyof T,
    value: string | number | boolean,
    operator: "AND" | "OR" = "AND"
  ) {
    this.whereList.push({ query: `${prop.toString()}=${value}`, operator });
    return this;
  }

  whereIn(prop: keyof T, values: any, operator: "AND" | "OR" = "AND") {
    this.whereList.push({
      query: `${prop.toString()} IN (${values})`,
      operator,
    });
    return this;
  }

  whereNot(
    prop: keyof T,
    value: string | number | boolean,
    operator: "AND" | "OR" = "AND"
  ) {
    this.whereList.push({ query: `${prop.toString()}!=${value}`, operator });
    return this;
  }

  whereNotIn(prop: keyof T, values: any, operator: "AND" | "OR" = "AND") {
    this.whereList.push({
      query: `${prop.toString()} NOT IN (${values})`,
      operator,
    });
    return this;
  }

  whereLike(
    prop: keyof T,
    value: string,
    operator: "AND" | "OR" = "AND"
  ) {
    this.whereList.push({
      query: `${prop.toString()} LIKE ${value}`,
      operator,
    });
    return this;
  }

  whereNotLike(
    prop: keyof T,
    value: string,
    operator: "AND" | "OR" = "AND"
  ) {
    this.whereList.push({
      query: `${prop.toString()} NOT LIKE ${value}`,
      operator,
    });
    return this;
  }

  whereBetween(
    prop: keyof T,
    start: number,
    end: number,
    operator: "AND" | "OR" = "AND"
  ) {
    this.whereList.push({
      query: `${prop.toString()} BETWEEN ${start} AND ${end}`,
      operator,
    });
    return this;
  }

  whereLessThan(
    prop: keyof T,
    value: number,
    operator: "AND" | "OR" = "AND"
  ) {
    this.whereList.push({ query: `${prop.toString()}<${value}`, operator });
    return this;
  }

  whereLessThanOrEqual(
    prop: keyof T,
    value: number,
    operator: "AND" | "OR" = "AND"
  ) {
    this.whereList.push({ query: `${prop.toString()}<=${value}`, operator });
    return this;
  }

  whereGreaterThan(
    prop: keyof T,
    value: number,
    operator: "AND" | "OR" = "AND"
  ) {
    this.whereList.push({ query: `${prop.toString()}>${value}`, operator });
    return this;
  }

  whereGreaterThanOrEqual(
    prop: keyof T,
    value: number,
    operator: "AND" | "OR" = "AND"
  ) {
    this.whereList.push({ query: `${prop.toString()}>=${value}`, operator });
    return this;
  }

  whereNull(prop: keyof T, operator: "AND" | "OR" = "AND") {
    this.whereList.push({ query: `${prop.toString()} IS NULL`, operator });
    return this;
  }

  whereNotNull(prop: keyof T, operator: "AND" | "OR" = "AND") {
    this.whereList.push({ query: `${prop.toString()} IS NOT NULL`, operator });
    return this;
  }

  order(prop: keyof T, order: "ASC" | "DESC") {
    this.query += ` ORDER BY ${prop.toString()} ${order}`;
    return this;
  }

  group(prop: keyof T) {
    this.query += ` GROUP BY ${prop.toString()}`;
    return this;
  }

  take(value: number) {
    this.query += ` LIMIT ${value}`;
    return this;
  }

  skip(value: number) {
    this.query += ` OFFSET ${value}`;
    return this;
  }

  join(table: string, prop: keyof T, tableProp: string) {
    this.query += ` JOIN ${table} ON ${this._table}.${prop}=${table}.${tableProp}`;
    return this;
  }
}
