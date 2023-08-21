import { getAggregatedMemories } from "../../../api";

export const getMemoriesToRender = (
  productSlug,
  setMemories,
  setMemoriesNumber
) => {
  getAggregatedMemories(productSlug).then((r) => {
    const memoriesItems = r.response;
    setMemoriesNumber(memoriesItems.length);
    const memArrToRender = [[], [], []];
    let iterator = 0;
    for (let i = 0; i < memoriesItems.length;) {
      const item = memoriesItems.shift();
      memArrToRender[iterator].push(item);
      if (iterator === 2) {
        iterator = 0;
      } else iterator++;
    }
    setMemories(memArrToRender);

  })

};
