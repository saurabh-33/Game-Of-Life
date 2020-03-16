function fillColorsInTable() {
    const colorBoxCollection = document.querySelectorAll("#info-table .rect-color>span");
    for (let i=0; i<colorBoxCollection.length; i++) {
        const [h,s,l] = ageColors[i];
        colorBoxCollection[i].style.backgroundColor = `hsl(${h},${s}%,${l}%)`;
        console.log(colorBoxCollection[i].style.backgroundColor)
    }
}

fillColorsInTable();