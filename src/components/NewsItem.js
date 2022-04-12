import React from "react";

const NewsItem =(props)=> {
 
    let { title, description, imageUrl, newsUrl, author, date,source} = props;
  
    return (
     
      <div className="my-3">
        <div className="card">
          <div style={{
           display:'flex',
           justifyContent:'flex-end',
           position:'absolute',
           right:'0'
          }
            
          }>
          <span className=" badge rounded-pill bg-danger" >
            {source}
          </span>
          </div>
          <img
            src={
              imageUrl
                ? imageUrl
                : "https://cdn.cnn.com/cnnnext/dam/assets/220223232943-tokyo-stock-market-02242022-super-tease.jpg"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                by {author ? author : "Unknown"} updated on{" "}
                {new Date(date).toUTCString()}
              </small>
            </p>
            <a href={newsUrl} target="-blank" className="btn btn-sm btn-dark">
              read more
            </a>
          </div>
        </div>
       
      </div>
    );
  
}

export default NewsItem;
