import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
import Container from "../Container";
import {useStoreContext} from "../../utils/GlobalStore";
import API from '../../utils/API';
import MenuItems from "../MenuItems";
import menu from "../../db/menu.json";
import Button from "../Button";
import { LOAD_FAVORITES } from "../../utils/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeartBroken, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

//need to find a way to retrieve prices from the menu 
function Favorites(props) {    
    // get user email
    const [state,dispatch] = useStoreContext();
    //load menu items stored under that user
    const getFavoriteItems=(email) => {
        //gets favorites from db given user email
        API.getFavorites(email).
        then(res=> dispatch({type:LOAD_FAVORITES,payload:res.data})).
        catch(err => console.log(err));
    };
   
    //create function that goes and gets the current price for an item item from the 
    //menu. store that price in an array. 
    function getPrice(item){
        return ( menu.filter(food => food.name==item)[0].price);
    }
    useEffect(() => {
        getFavoriteItems(state.email);
    },[]);
    const { menuCart } = props;
    
    function deleteFave(itemName){
        API.deleteFavorite({item:itemName, UserEmail: state.email}).
        then(res=> getFavoriteItems(state.email)).
        catch(err => console.log(err));
        
    };
    //add funciton to add item to order 
    return (<>
        <Container>
            <div className="menu-container">
            <h1>Favorites</h1>     
            <Link to="/ayce" className="active">
                <Button type={"button"} className={"btn btn1"} style={{display:"inline-block"}}><h5>BACK TO MENU</h5></Button>
            </Link>    
            {state.favorites.length ? state.favorites.map((fav)=>{
                return (
                    <div className="card text-center">
                        <div className="card-body d-flex justify-content-between">
                            <MenuItems key={fav.id} name={fav.item} price={getPrice(fav.item)} description={fav.category} >                        
                                <Button btn={"float-right"} function={() => deleteFave(fav.item)} ><FontAwesomeIcon icon={faHeartBroken} /></Button>
                                <Button id={fav.id} type="button" btn={"float-right btn btn1"} function={() => { props.addItem({"name":fav.item,"price":1000,"category":fav.category,"quantity":1})}}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </Button>
                            </MenuItems>
                        </div>
                    </div>
                )
            }) : <span>You have no favorites :(  You may add favorites from your cart! Happy eating!  ) </span>}
        </div>
        </Container>
    </>);
}



// const mapStateToProps = state => ({
//     favCart: state.favCart
// });

// const mapDispatchToProps = dispatch => {
//     return {
//         removeItem: item => {
//             //is this where we remove the item?
//             // or in reducer/favCart?
//             dispatch({})
//         }
//     }
// };

// const Favorite = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(FavCart);


export default Favorites;
