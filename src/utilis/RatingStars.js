import { TiStarFullOutline } from "react-icons/ti";
import { TiStarHalfOutline } from "react-icons/ti";
import { TiStarOutline } from "react-icons/ti";
import { useState,useEffect } from "react";
function RatingStars({Review_count,Star_size}){
    const [starCount,setStarCount]=useState({
        full:0,
        half:0,
        empty:0,
    })

    useEffect(()=>{
        const WholeStars=Math.floor(Review_count)||0;
        setStarCount({
            full:WholeStars,
            half:Number.isInteger(Review_count)?0:1,
            empty:Number.isInteger(Review_count)?5-WholeStars:4-WholeStars,

        },[Review_count]);

    },[]);

    return (<div className="flex gap-1 text-yellow-100">
        {
            [...new Array(starCount.full)].map((_,i)=>{
                return <TiStarFullOutline key={i} size={Star_size||20} />
            })
        }
         {
            [...new Array(starCount.half)].map((_,i)=>{
                return <TiStarHalfOutline key={i} size={Star_size||20} />
            })
        }
         {
            [...new Array(starCount.empty)].map((_,i)=>{
                return <TiStarOutline key={i} size={Star_size||20} />
            })
        }
    </div>);



}
export default RatingStars;