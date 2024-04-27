const _gameObjects = {
  upgrades: [
    {
      id: 0,
      name: "Weapon",
      description: "<p>Upgrades Click Damage</p>",
      requiredresearch: [],
      requireditems: [],
      type: 0,
      effectitemid: 0,
      levels: [
        {
          cost: 5,
          upgrade: {
            baseValue: 1,
            critChance: 0,
            critDamage: 0,
          },
        },
        {
          cost: 20,
          upgrade: {
            baseValue: 1,
            critChance: 0,
            critDamage: 0,
          },
        },
        {
          cost: 50,
          upgrade: {
            baseValue: 1,
            critChance: 0,
            critDamage: 0,
          },
        },
      ],
    },
    {
      id: 1,
      name: "Clones",
      description: "<p>Upgrades Clone Damage</p>",
      requiredresearch: [0],
      requireditems: [],
      type: 1,
      effectitemid: 0,
      levels: [
        {
          cost: 10,
          upgrade: {
            baseValue: 0.5,
            critChance: 0,
            critDamage: 0,
          },
        },
        {
          cost: 50,
          upgrade: {
            baseValue: 1,
            critChance: 0,
            critDamage: 0,
          },
        },
        {
          cost: 100,
          upgrade: {
            baseValue: 1,
            critChance: 0,
            critDamage: 0,
          },
        },
      ],
    },
    {
      id: 2,
      name: "Crit Chance",
      description: "<p>Click Damage Can Now Critically Hit</p>",
      requiredresearch: [1],
      requireditems: [],
      type: 0,
      effectitemid: 0,
      levels: [
        {
          cost: 100,
          upgrade: {
            baseValue: 1,
            critChance: 0.1,
            critDamage: 0,
          },
        },
        {
          cost: 250,
          upgrade: {
            baseValue: 1,
            critChance: 0,
            critDamage: 0.5,
          },
        },
        {
          cost: 500,
          upgrade: {
            baseValue: 1,
            critChance: 0.1,
            critDamage: 0.5,
          },
        },
      ],
    },
    {
      id: 3,
      name: "Refining",
      description: "<p>Further Increase Click Damage</p>",
      requiredresearch: [2],
      requireditems: [],
      type: 0,
      effectitemid: 0,
      levels: [
        {
          cost: 100,
          upgrade: {
            baseValue: 1,
            critChance: 0,
            critDamage: 0,
          },
        },
        {
          cost: 500,
          upgrade: {
            baseValue: 2,
            critChance: 0,
            critDamage: 0,
          },
        },
        {
          cost: 1000,
          upgrade: {
            baseValue: 2,
            critChance: 0,
            critDamage: 1,
          },
        },
      ],
    },
    {
      id: 4,
      name: "Super Clones",
      description: "<p>Upgrades Super Clone Damage</p>",
      requiredresearch: [3],
      requireditems: [],
      type: 1,
      effectitemid: 1,
      levels: [
        {
          cost: 250,
          upgrade: {
            baseValue: 1,
            critChance: 0.1,
            critDamage: 0,
          },
        },
        {
          cost: 1000,
          upgrade: {
            baseValue: 1,
            critChance: 0,
            critDamage: 0,
          },
        },
        {
          cost: 2500,
          upgrade: {
            baseValue: 1,
            critChance: 0.1,
            critDamage: 1,
          },
        },
      ],
    },
  ],
  research: [
    {
      id: 0,
      name: "Cloning",
      description: "<p>Unlocks Clones</p>",
      cost: 1,
      requireditems: [],
      requiredtooltip: "",
      requiredresearch: [],
    },
    {
      id: 1,
      name: "Critcal Strike",
      description: "<p>Unlocks Upgrading Click Damage</p>",
      cost: 10,
      requireditems: [{ id: 0, quantity: 2 }],
      requiredtooltip: "<p>2 Clones Required</p>",
      requiredresearch: [0],
    },
    {
      id: 2,
      name: "Refining",
      description: "<p>Further Unlocks Upgrading Click Damage</p>",
      cost: 100,
      requireditems: [{ id: 0, quantity: 5 }],
      requiredresearch: [0],
      requiredtooltip: "<p>5 Clones Required</p>",
    },
    {
      id: 3,
      name: "Super Clones",
      description: "<p>Unlocks Super Clones</p>",
      cost: 1000,
      requireditems: [{ id: 0, quantity: 10 }],
      requiredresearch: [1, 2],
      requiredtooltip: "<p>10 Clones Required</p>",
    },
  ],
  shopitems: [
    {
      id: 0,
      name: "Clone",
      cost: 5,
      requireditems: [],
      requiredtooltip: "",
      max: 10,
      multiplier: 2,
      requiredresearch: [0],
      cps: {
        baseValue: 0.5,
        critChance: 0,
        critDamage: 0,
      },
    },
    {
      id: 1,
      name: "Super Clone",
      cost: 20,
      requireditems: [{ id: 0, quantity: 10 }],
      requiredtooltip: "<p>10 Clones Required</p>",
      max: 10,
      multiplier: 3,
      requiredresearch: [3],
      cps: {
        baseValue: 1,
        critChance: 0.1,
        critDamage: 1,
      },
    },
  ],
};

const _gameState = {
  playername: "",
  theme: "",
  gamestats: {
    currentscore: 0,
    totalclicks: 0,
    totalspent: 0,
    currentAveragecps: 0,
    averageclickvalue: 1,
  },
  clickstats: {
    baseValue: 1,
    critChance: 0,
    critDamage: 0.5,
  },
  researched: [],
  upgrades: [],
  inventory: [],
};

export { _gameObjects, _gameState };
