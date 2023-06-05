export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class BasicItem extends Item {
  updateQuality() {
    if (this.sellIn > 0) {
      this.quality--;
    } else {
      this.quality -= 2;
    }
    if (this.quality < 0) {
      this.quality = 0;
    }

    this.sellIn--;
  }
}

export class AgedItem extends Item {
  updateQuality() {
    if (this.quality < 50) {
      this.quality++;
    } else if (this.quality >= 50) {
      this.quality = 50;
    }
    this.sellIn--;
  }
}

export class ConcertItem extends Item {
  updateQuality() {
    if (this.sellIn <= 0) {
      this.quality = 0;
    } else if (this.sellIn <= 5) {
      this.quality += 3;
    } else if (this.sellIn <= 10) {
      this.quality += 2;
    } else if (this.sellIn > 10) {
      this.quality++;
    }
    this.sellIn--;
  }
}

export class LegendaryItem extends Item {
  updateQuality() {}
}

export class ConjuredItem extends Item {
  updateQuality() {
    this.quality -= 2;
    if (this.quality < 0) {
      this.quality = 0;
    }
    this.sellIn--;
  }
}

export let items = [];

items.push(new BasicItem("+5 Dexterity Vest", 10, 20));
items.push(new AgedItem("Aged Brie", 2, 0));
items.push(new BasicItem("Elixir of the Mongoose", 5, 7));
items.push(new LegendaryItem("Sulfuras, Hand of Ragnaros", 0, 80));
items.push(
  new ConcertItem("Backstage passes to a TAFKAL80ETC concert", 15, 20)
);
items.push(new ConjuredItem("Conjured Mana Cake", 3, 6));

export const updateQuality = () => {
  for (let item of items) {
    item.updateQuality();
  }
};
//     if (
//       item.name != "Aged Brie" &&
//       item.name != "Backstage passes to a TAFKAL80ETC concert"
//     ) {
//       if (item.quality > 0) {
//         if (item.name != "Sulfuras, Hand of Ragnaros") {
//           item.quality = item.quality - 1;
//         }
//       }
//     } else {
//       if (item.quality < 50) {
//         item.quality = item.quality + 1;
//         if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
//           if (item.sellIn < 11) {
//             if (item.quality < 50) {
//               item.quality = item.quality + 1;
//             }
//           }
//           if (item.sellIn < 6) {
//             if (item.quality < 50) {
//               item.quality = item.quality + 1;
//             }
//           }
//         }
//       }
//     }
//     if (item.name != "Sulfuras, Hand of Ragnaros") {
//       item.sellIn = item.sellIn - 1;
//     }
//     if (item.sellIn < 0) {
//       if (item.name != "Aged Brie") {
//         if (item.name != "Backstage passes to a TAFKAL80ETC concert") {
//           if (item.quality > 0) {
//             if (item.name != "Sulfuras, Hand of Ragnaros") {
//               item.quality = item.quality - 1;
//             }
//           }
//         } else {
//           item.quality = item.quality - item.quality;
//         }
//       } else {
//         if (item.quality < 50) {
//           item.quality = item.quality + 1;
//         }
//       }
//     }
//   }
// };
