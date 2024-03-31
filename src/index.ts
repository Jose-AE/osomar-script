#!/usr/bin/env node

const VERSION = "1.1.1";

import yargs from "yargs/yargs";
import * as fs from "fs";
import { Compiler } from "./frontend/compiler";
import * as repl from "repl";

const argv = yargs(process.argv.slice(2))
  .version("v" + VERSION)
  .alias("v", "version")
  .alias("h", "help")
  .options({
    debug: {
      type: "boolean",
      alias: "d",
      description: "Run in debug mode",
      default: false,
    },
    repl: {
      type: "boolean",
      alias: "r",
      description: "REPL Mode",
      default: false,
    },
  })
  .parseSync();

function customEval(
  cmd: string,
  context: any,
  filename: string,
  callback: (err: Error | null, result?: any) => void
) {
  try {
    const value = Compiler.compile(cmd, argv.debug);
    callback(null, value);
  } catch (error) {
    callback(error as Error);
  }
}

if (argv.repl) {
  console.log("[REPL Mode]");
  repl.start({
    prompt: ">> ",
    eval: customEval,
  });
} else if (argv._[0]) {
  fs.readFile(argv._[0], "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err}`);
      process.exit(1);
    }

    Compiler.compile(data, argv.debug);
  });
} else {
  console.error("Please provide <filename>.os");
  process.exit(1);
}
