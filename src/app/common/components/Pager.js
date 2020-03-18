import React from 'react';
import MediaQuery from 'react-responsive';

class Pager extends React.Component {

    static displayName = 'pos.Pager';

    constructor(props) {
        super(props);
    }

    pageChange(event) {
        this.props.setPage(parseInt(event.target.getAttribute("data-value")));
    }

    render() {
        const {id, name, currentPage, maxPage, previousText, nextText, hidePrevNext, previous, next, dataProps} = this.props;

        let previousComp = "";
        let nextComp = "";
        let nbPages = 0;
        let paginationClass = "total-";
        let options = [];
        let startIndex = Math.max(currentPage - 5, 0);
        let endIndex = Math.min(startIndex + 10, maxPage);

        if (maxPage > 1) {

            if (!hidePrevNext) {
                if (currentPage > 0) {
                    previousComp = <div onClick={previous} className="previous">{previousText}</div>
                } else {
                    previousComp = <div className="previous disable">{previousText}</div>
                }

                if (currentPage != (maxPage - 1)) {
                    nextComp = <div onClick={next} className="next">{nextText}</div>
                } else {
                    nextComp = <div className="next disable">{nextText}</div>
                }
            }
            if (maxPage >= 10 && (endIndex - startIndex) <= 10) {
                startIndex = endIndex - 10;
            }
            for (let i = startIndex; i < endIndex; i++) {
                let selected = currentPage == i ? "current-page-selected" : "";
                options.push(<div className={selected} data-value={i} key={"pager_" + i}
                                  onClick={(event) => this.pageChange(event)}>{i + 1}</div>);

                nbPages++;
            }
            paginationClass = paginationClass + nbPages;
        }
        const p = currentPage;
        const responsiveOptions = [<div className={"current-page-selected"} data-value={p} key={"pager_" + p}>
            {p + 1}/{maxPage}</div>];


        const properties = {
            id,
            className: "row custom-pager",
            ...dataProps,
        };

        return (
            <div {...properties}>
                <div className="left">{previousComp}</div>
                <div className="pages center">
                    <MediaQuery query='(max-width: 768px)'>
                        {isMobile => <div
                            className={isMobile ? "total-1" : paginationClass}>{isMobile ? responsiveOptions : options}
                        </div>}
                    </MediaQuery>
                </div>
                <div className="right">{nextComp}</div>
            </div>
        )
    }
}

export default Pager;
