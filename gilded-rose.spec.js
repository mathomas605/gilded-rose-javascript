import { expect, describe, it } from "vitest";
import {
  Item,
  items,
  updateQuality,
  AgedItem,
  LegendaryItem,
  ConcertItem,
  ConjuredItem,
  BasicItem,
} from "./gilded-rose.js";

describe("updateQuality", () => {
  it("reduces quality and sellIn of basic items by 1", () => {
    const testItem = new BasicItem("basic", 5, 3);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(2);
    expect(testItem.sellIn).toBe(4);
  });

  //Once the `sellIn` days is less then zero, `quality` degrades twice as fast.
  it("reduces quality by 2 for items with sellIn < 0", () => {
    //arange
    const testItem = new BasicItem("basic", -2, 8);
    items.push(testItem);

    //act
    updateQuality();

    //asert
    expect(testItem.quality).toBe(6);
    expect(testItem.sellIn).toBe(-3);
  });
  //The `quality` of an item is never negative.
  it("does not reduce quality to a negitve number", () => {
    //arange
    const testItem = new BasicItem("basic", 2, 0);
    items.push(testItem);

    //act
    updateQuality();

    //asert
    expect(testItem.quality).toBeGreaterThanOrEqual(0);
  });
  //"Aged Brie" actually increases in `quality` the older it gets.
  it("quality of aged Brie quality will Increace as sellIn decreaces", () => {
    //arange
    const testItem = new AgedItem("Aged Brie", 3, 8);
    items.push(testItem);

    //act
    updateQuality();

    //asert
    expect(testItem.quality).toBe(9);
  });
  //The `quality` of an item is never more than `50`.
  it("quality of an Item is never < 50", () => {
    //arrange
    const testItem = new AgedItem("Aged Brie", 3, 50);
    items.push(testItem);

    //act
    updateQuality();

    //asert
    expect(testItem.quality).toBe(50);
  });
  //"Sulfuras, Hand of Ragnaros," being a legendary item, never has to be sold nor does it decrease in `quality`.
  it("Hand of Ragnaros remaines unchanged", () => {
    const testItem = new LegendaryItem("Sulfuras, Hand of Ragnaros", 0, 80);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(80);
    expect(testItem.sellIn).toBe(0);
  });
  //Backstage passes to a TAFKAL80ETC concert", increase in `quality` as it's `sellIn` value decreases:
  //by `2` when there are `10` days or less

  it("quality increases by 2 there are days <= 10", () => {
    const testItem = new ConcertItem(
      "Backstage passes to a TAFKAL80ETC concert",
      10,
      20
    );
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(22);
  });
  //by `3` when there are `5` days or less
  it("quality will increase by 3 when days <= 5", () => {
    const testItem = new ConcertItem(
      "Backstage passes to a TAFKAL80ETC concert",
      5,
      20
    );
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(23);
  });
  // drops to `0` after the concert.
  it("quality will decreace to 0 when days <= 0", () => {
    const testItem = new ConcertItem(
      "Backstage passes to a TAFKAL80ETC concert",
      0,
      20
    );
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(0);
  });
  //"Conjured" items degrade in `quality` twice as fast as normal items.
  it("Conjure items degrade in `quality` twice as fast as normal items", () => {
    const testItem = new ConjuredItem("conjured spear", 20, 50);

    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(48);
  });
  //"Conjured" items quality does not go below 0.
  it("Conjured items quality does not go below 0.", () => {
    const testItem = new ConjuredItem("conjured goblin tooth", 20, -1);

    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(0);
  });
});
