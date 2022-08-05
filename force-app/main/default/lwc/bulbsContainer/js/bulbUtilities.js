let order = [];

function setBulbColor({ context, name, color }) {
    const bulb = context.template.querySelector(`[data-name="${name}"]`);

    bulb?.setBulbColor(color);

    return bulb;
}

function setBulbTime(bulb) {
    bulb?.setBulbTime();

    return bulb;
}

function setBulbCounter(bulb) {
    if (bulb) order.push(bulb.dataset.name);

    return bulb;
}

function showBulbNumber(bulb) {
    const counter = order.indexOf(bulb?.dataset.name) + 1;

    if (bulb && counter > 0) bulb.number = counter;

    return bulb;
}

function showAllBulbNumbers({ context }) {
    context.template.querySelectorAll('c-bulb').forEach(bulb => {
        showBulbNumber(bulb);
    });
}

function clearOrder() {
    order = [];
}

export {
    setBulbColor,
    setBulbTime,
    setBulbCounter,
    showBulbNumber,
    showAllBulbNumbers,
    clearOrder
};