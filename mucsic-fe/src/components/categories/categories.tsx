import React, { useEffect, useState } from "react";
import { MainWrap } from "../../styled/CategorySection";
import {data} from './data'
import axios from "axios";
import { Link } from "react-router-dom";
const Categories = () => {
    const [categories, setCategories] = useState([]);
    const getData  = async () => {
        try {
            const getCategories = await axios.get(process.env.REACT_APP_API_BASE_URL + '/categories?page=1&limit=30')
            setCategories(getCategories.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getData();
    } ,[])
    return(
        <MainWrap>
            <div style={{width: "100%", padding: "30px"}}>
                <div className="categories-title" style={{marginBottom: "20px",
             color: "#fff", fontSize: "24px"}}>Thể loại</div>
                <div className="list-category" style={{
                    display: "grid",
                    gridGap : "24px",
                    gridTemplateColumns:"repeat(5,minmax(0,1fr))",
                    minWidth: "446px",
                    gridAutoRows: "auto"
                }}>
                    {categories.length > 0 && categories.map((category:any)=>{
                        return <Link key={category.id} className="category-card-item" style={{backgroundColor: "rgb(39, 133, 106)",
                        border: "none",
                        borderRadius: "8px",
                        overflow:"hidden",
                        width: "100%",
                        textDecoration: "none",
                        height: "200px"
                    }}
                        to={`/category/${category.id}`}>
                            <span className="category-title" style={{
                                padding: "16px",
                                maxWidth: "100%",
                            overflowWrap: "break-word",
                            position:"absolute",
                            color: "#fff",
                            fontSize: "22px"
                            }}>
                                {category.name}
                            </span>
                        </Link>
                    })}
                </div>
            </div>
        </MainWrap>
    )
}

export default Categories;