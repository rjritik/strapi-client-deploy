export const dateFormat = (dateString) => {
    // const date = new Date(dateString);
    // const month = date.getMonth() + 1;
    // const day = date.getDate();
    // const year = date.getFullYear();
    // return `${month}/${day}/${year}`;

    const date = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };

    const dateConverted = date.toLocaleDateString("en-US", options);
    const dateSlice = dateConverted.split(" ");
    const month = dateSlice[1].split(",");
    const finalDate = `${month[0]}-${dateSlice[0]}-${dateSlice[2]}`;
    return finalDate;
};
