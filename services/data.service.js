export class DataService {
  //here data has to be in the Form Array<Object>
  rollAndBranchExtractor(data) {
    const rollNo = [];
    const branch = [];
    data.forEach((entry) => {
      for (let key in entry) {
        const cleanedKey = key.toLocaleLowerCase().replace(" ", "");
        if (cleanedKey.includes("rolln")) rollNo.push(entry[key]);
        if (
          cleanedKey.replace(" ", "").includes("branch") ||
          cleanedKey.includes("department") ||
          cleanedKey === "dep"
        )
          branch.push(entry[key]);
        else {
        }
      }
    });
    return { rollNo, branch };
  }
}
