import Spinner from "https://raw.githubusercontent.com/ameerthehacker/cli-spinners/master/mod.ts";
import { getColorEnabled, cyan } from "https://deno.land/std/fmt/colors.ts";
import { promptUser } from "./prompts.ts";
import { getTemplatedFile } from "./template.ts";
import { writeTemplatedFile, writeStarterFiles } from "./write.ts";

let print = (text: string): void =>
  getColorEnabled() ? console.log(cyan(text)) : console.log(text);

print(`
_,-=._              /|_/|
  \`-.}   \`=._,.-=-._.,  @ @._,
     \`._ _,-.   )      _,.-'
        \`    G.m-"^m\`m'
`);
print(
  "Haii!! This foxxo will help you bootstrap a Deno web project. Answer some questions, and your project will be created! ^w^",
);

const userChoice = await promptUser();

const templateDefaults = {
  nl: "\n",
  main: "src/main.ts",
  flags: false,
  allow: {
    read: false,
    write: false,
    net: false,
  },
};

let templateOptions = {};
if (userChoice.webFramework) {
  templateOptions = {
    ...templateDefaults,
    main: "src/server.ts",
    framework: userChoice.webFramework,
    allow: {
      read: true,
      net: true,
    },
  };
}

let string = await getTemplatedFile(
  "velociraptor/scripts.yaml.ejs",
  templateOptions,
);

await writeTemplatedFile("scripts.yaml", string);
await writeStarterFiles(userChoice.webFramework);
