#!/usr/bin/env node

import * as fs from "fs";
import { Compiler } from "./frontend/compiler";

if (process.argv.length !== 3) {
  console.error("Usage: os <filename>.os");
  process.exit(1);
}

const filename = process.argv[2];

fs.readFile(filename, "utf8", (err, data) => {
  if (err) {
    console.error(`Error reading file: ${err}`);
    process.exit(1);
  }

  Compiler.compile(data);
});
