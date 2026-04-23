const { execSync } = require("child_process");

function getDiskUsage(){

  try{
    const output = execSync("wmic logicaldisk get size,freespace,caption").toString();

    const lines = output.split("\n").filter(l=>l.includes("C:"));

    if(lines.length === 0) return { percent:0 };

    const parts = lines[0].trim().split(/\s+/);

    const free = parseInt(parts[1]);
    const size = parseInt(parts[2]);

    const used = size - free;
    const percent = Math.round((used / size) * 100);

    return { percent };

  }catch(e){
    return { percent:0 };
  }
}

module.exports = { getDiskUsage };