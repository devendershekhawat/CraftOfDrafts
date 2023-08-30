import { useLayoutEffect, useState } from 'react';

export type ArticleSelction = {
    anchorOffset: number,
    focusOffset: number,
    range: Range,
    text: string
}

function useTextSelection(
    readerRef: HTMLDivElement | null,
    tooltipRef: HTMLDivElement | null
) {
    // a state to store the selection object
    const [selection, setSelection] = useState<ArticleSelction | null>(null);

    const resetSelection = () => {
        setSelection(null);
        if (tooltipRef) {
            tooltipRef.style.display = 'none';
        }
    }

    const handler = () => {
        const selectionObject = document.getSelection();
        if (!selectionObject || (selectionObject.anchorOffset === selectionObject.focusOffset)) {
            // if no selection set null;
            resetSelection();
        } else {
            // otherwise set selection
            setSelection({
                anchorOffset: selectionObject.anchorOffset,
                focusOffset: selectionObject.focusOffset,
                range: selectionObject.getRangeAt(0),
                text: selectionObject.toString()
            });
            const boundedRect = selectionObject
                .getRangeAt(0)
                .getBoundingClientRect();
            if (tooltipRef) {
                tooltipRef.style.display = 'block';
                const tooltipDimensions = tooltipRef.getBoundingClientRect();
                tooltipRef.style.top = `${(window.pageYOffset + boundedRect.top) - tooltipDimensions.height}px`;
                tooltipRef.style.left = `${boundedRect.left + ((boundedRect.right - boundedRect.left)/2) - (tooltipDimensions.width/2)}px`;
            }
        }
    };

    useLayoutEffect(() => {
        // attach a mouseup event listener on refObject to get the selection
        if (readerRef && readerRef) {
            // add listener when ref is not null
            readerRef.addEventListener('mouseup', handler);
        }
    }, [readerRef, tooltipRef]);

    return { selection, resetSelection }
}

export default useTextSelection;