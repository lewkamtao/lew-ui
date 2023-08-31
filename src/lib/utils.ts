export const convertProps = (json: any) => {
    const props = [];
    for (const key in json) {
        if (json.hasOwnProperty(key)) {
            let type = '';
            if (Array.isArray(json[key].type)) {
                type = json[key].type
                    .map((item: any) =>
                        item ? item.toString().match(/function\s+(\w+)/)[1] : ''
                    )
                    .filter((item: any) => item !== '')
                    .join(' | ');
            } else {
                type =
                    json[key].type !== null
                        ? json[key].type.toString().match(/function\s+(\w+)/)[1]
                        : '';
            }
            const prop = {
                name: key,
                description: json[key].description,
                type: type,
                default: json[key].default || '',
            };
            props.push(prop);
        }
    }
    return props;
};
