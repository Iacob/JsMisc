
const mysql = require('mysql');

const conn_options = {}; // replace this with real options

var pool = mysql.createPool(conn_options);


function db_insert(table, params, options, result_call) {

  var params1 = Object.assign({}, params);
  //var columns = Object.keys(params1);

  var columns = new Array();
  var values1 = new Array();
  var value_replaces = new Array();

  Object.entries(params).forEach(kv => {
    columns.push(kv[0]);
    if (isRawData(kv[1])) {
      value_replaces.push(kv[1].text);
    }else {
      value_replaces.push("?");
      values1.push(kv[1]);
    }
  });

  var sql = " insert into " + table + " ( " + columns.join(',') + " ) values ( " + value_replaces.join(',') + " ) ";

  db_update(sql, values1, null, (err, results) => {
    result_call(err, results);
  });
}


function db_update_row(table, params, row_id, options, result_call) {

  if (row_id == null) { row_id = {} }

  var params1 = Object.assign({}, params);
  params1 = Object.entries(params1).filter((kv) => (kv[1] != null));
  params1 = Object.fromEntries(params1);

  var set_clause = new Array();
  var set_values = new Array();

  Object.entries(params1).forEach(kv => {
    if (isRawData(kv[1])) {
      set_clause.push(kv[0] + " = " + kv[1].text);
    }else {
      set_clause.push(kv[0] + " = ?");
      set_values.push(kv[1]);
    }
  });

  var where_clause = new Array();
  var where_values = new Array();

  Object.entries(row_id).forEach(kv => {
    if (isRawData(kv[1])) {
      where_clause.push(kv[0] + " = " + kv[1].text);
    }else {
      where_clause.push(kv[0] + " = ?");
      where_values.push(kv[1]);
    }
  });

  var sql = " update " + table + " set " + set_clause.join(",")
      + " where " + where_clause.join(",");

  var param_values1 = new Array();
  param_values1.push(...set_values);
  param_values1.push(...where_values);

  db_update(sql, param_values1, null, (err, results) => {
    result_call(err, results);
  });
}

function TypeRawData(value) {
  this.text = value;
}

function rawData(value) {
  return new TypeRawData(value);
}

function isRawData(data) {
  return data instanceof TypeRawData;
}

exports.db_insert = db_insert;
exports.db_update_row = db_update_row;
exports.rawData = rawData;
exports.isRawData = isRawData;
exports.TypeRawData = TypeRawData;
