import { useState, useEffect } from 'react';

function useApprovedItems(items) {
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        const initialSelectedItems = items.reduce((selected, item, index) => {
            if (item.materialStatus === "APPROVED") {
                selected.push(index);
            }
            return selected;
        }, []);
        setSelectedItems(initialSelectedItems);
    }, [items]);

    return [selectedItems, setSelectedItems];
}

export default useApprovedItems;

