// Timestamp 6 March 2026 23:00
// File: /lib/generate-db-diagram.ts

/*
Supabase Database Diagram Generator

Creates entity relationship diagrams
from schema metadata.
*/

export function generateDatabaseDiagram(schema:any) {

let diagram = "erDiagram\n"

for(const table of schema.tables){

diagram += `${table.table_name} {\n`

const cols = schema.columns.filter(
(c:any)=>c.table_name===table.table_name
)

for(const c of cols){

diagram += ` ${c.data_type} ${c.column_name}\n`

}

diagram += "}\n\n"

}

return diagram

}