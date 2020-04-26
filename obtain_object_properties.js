
function obtainPropValue(obj, ...props) {
    if (obj == null) {
	return null;
    }

    if (props == null) {
	return obj;
    }

    let currentValue = obj;
    for (let prop1 of props) {
	currentValue = currentValue[prop1];
	if (currentValue == null) {
	    return null;
	}
    }

    return currentValue;
}
