const _gameObjects = {
  upgrades: [
    {
      id: 0,
      name: "Weapon",
      description: "Upgrades Click Damage",
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
      description: "Upgrades Clone Damage",
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
      description: "Click Damage Can Now Critically Hit",
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
      description: "Further Increase Click Damage",
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
      description: "Upgrades Super Clone Damage",
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
      description: "Unlocks Clones",
      cost: 1,
      requireditems: [],
      requiredtooltip: "",
      requiredresearch: [],
    },
    {
      id: 1,
      name: "Critcal Strike",
      description: "Unlocks Upgrading Click Damage",
      cost: 10,
      requireditems: [{ id: 0, quantity: 2 }],
      requiredtooltip: "2 Clones Required",
      requiredresearch: [0],
    },
    {
      id: 2,
      name: "Refining",
      description: "Further Unlocks Upgrading Click Damage",
      cost: 100,
      requireditems: [{ id: 0, quantity: 5 }],
      requiredresearch: [0],
      requiredtooltip: "5 Clones Required",
    },
    {
      id: 3,
      name: "Super Clones",
      description: "Unlocks Super Clones",
      cost: 1000,
      requireditems: [{ id: 0, quantity: 10 }],
      requiredresearch: [1, 2],
      requiredtooltip: "10 Clones Required",
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
      requiredtooltip: "10 Clones Required",
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
  theme: "aqua",
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
