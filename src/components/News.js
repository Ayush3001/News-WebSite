import React, { useEffect,useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=> {
  
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  
  const updateNews= async ()=>{
    props.setProgress(10);
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&
    category=${props.category}&apiKey=6b88a115a4454f96958dcf2a75215c70&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data=await fetch(url);
    props.setProgress(30);
    let parsedData=await data.json();
    props.setProgress(50);
    console.log(parsedData);
    setArticles(parsedData.articles);
    setLoading(false);
    setTotalResults(parsedData.totalResults);
    props.setProgress(100);
  }
  useEffect(() => {
    document.title=`${props.category}-NewsApp`
    updateNews();
    //eslint-disable-next-line;
   }, [])

 const fetchMoreData = async() => {
    
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6b88a115a4454f96958dcf2a75215c70&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    let data=await fetch(url);
    let parsedData=await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults);
  };
  
    return(
      <>
        <h1 className="text-center" style={{margin:'35px 0px',marginTop:'90px'}}>Top {props.category} HeadLines</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row">
          {articles.map((element)=>{
           return <div className="col-md-4"   key={element.url}>
           <NewsItem
         
             title={element.title}
             description={element.description?element.description.slice(0,90):""}
             imageUrl={element.urlToImage}
             newsUrl={element.url}
             author={element.author}
             source={element.source.name}
             date={element.publishedAt}
             />
         </div>
          })
          }
          </div>
          </div>
          </InfiniteScroll>          
      
      </>
    );
  
}
News.defaultProps={
  country: 'us',
  pageSize:8,
  category:'general'
}
News.propTypes={
  country: PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string
}
export default News;
