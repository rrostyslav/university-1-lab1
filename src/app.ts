import readline from './readline'

const teams: Record<string, number> = {
  team1: 1,
  team2: 10,
  team3: 20,
  team4: 7,
};

type TeamsCollection = Record<string, number>;

class Item {
  #title: string;
  #shape: string;

  constructor(title: string, shape: string) {
    this.#title = title;
    this.#shape = shape;
  }

  get title() {
    return this.#title;
  }

  get shape() {
    return this.#shape;
  }
}

const getGameTitle = (game: Game, teams: TeamsCollection): string | void => {
  const { area, items } = game;

  if (!items["м'яч"]) return;
  if (
    Object.values(teams).filter((memberCount) => memberCount > 2).length === 2
  )
    return;
  if (area.toLowerCase() !== "приміщення") return;
  if (items["м'яч"].shape !== "круглий") return;
  if (!items["дерев'яний молот"]) {
    return "гольф";
  }
};

class Game {
  #title: string = "";
  #area: string = "";
  #items: Record<string, Item> = {};

  constructor(area: string, items?: Item[]) {
    this.#area = area;

    if (items) {
      this.addItems(...items);
    }

    this.#title = getGameTitle(this, teams) ?? "";
  }

  get area() {
    return this.#area;
  }

  get items() {
    return this.#items;
  }

  get title() {
    return this.#title;
  }

  addItem(item: Item): void {
    this.#items[item.title] = item;
  }

  addItems(...items: Item[]): void {
    this.#items = Object.fromEntries(items.map((item) => [item.title, item]));
  }
}

const startCLI = async () => {
  console.info("Welcome!");
  let game: Game | null = null;

  const area = await readline.question("Enter the game area: ");
  game = new Game(area);

  readline.setPrompt("Enter item title (or 'exit' to quit): ");
  readline.prompt();

  readline.on("line", async (input) => {
    if (input.toLowerCase() === "exit") {
      readline.close();
      return;
    }

    const shape = await readline.question("Enter item shape: ");
    const item = new Item(input, shape);
    if (game) game.addItem(item);

    console.info(
      `Item '${item.title}' with shape '${item.shape}' added to the game.`
    );
    readline.prompt();
  });

  readline.on("close", () => {
    if (game) console.info("Game title:", game.title);
    console.info("Thank you for using program!");
    process.exit(0);
  });
}

startCLI();

