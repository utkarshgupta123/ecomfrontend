import React, { useContext, useEffect, useState } from 'react'
import "./navbaar.css"
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';
import { Logincontext } from '../context/Contextprovider';
import { ToastContainer, toast } from 'react-toastify';
import LogoutIcon from '@mui/icons-material/Logout';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';
import { Drawer, IconButton, List, ListItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Rightheader from './Rightheader';
import { useSelector } from "react-redux";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbaar = () => {

    const history = useNavigate("");

    const [text, setText] = useState();
    console.log(text);
    const [liopen, setLiopen] = useState(true);
    // only for search
    const { products } = useSelector(state => state.getproductsdata);

    const { account, setAccount } = useContext(Logincontext);
    // console.log(account);
    /////////////////////////////////////////////////////
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    //copy paste from menu in material ui icons
    /////////////////////////////////////////////////////////////
    const [dropen, setDropen] = useState(false); // for rightheader.js


    const getdetailsvaliduser = async () => {
        const res = await fetch("/validuser", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();
        // console.log(data);

        if (res.status !== 201) {
            console.log("first login");
        } else {
            // console.log("cart add ho gya hain");
            setAccount(data);
        }
    }

    useEffect(() => {
        getdetailsvaliduser();
    }, []);


    // for logout
    const logoutuser = async () => {
        const res2 = await fetch("/logout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data2 = await res2.json();
        // console.log(data2);

        if (res2.status !== 201) {
            // const error = new Error(res2.error);
            // throw error;
            console.log("error");
        } else {
            console.log("data valid");
            // setOpen(false)
            toast.success("user Logout 😃!", {
                position: "top-center"
            });
            history("/");
            setAccount(false);
        }
    }

    // for drawer

    const handelopen = () => {
        setDropen(true);
    }

    const handleClosedr = () => {
        setDropen(false)
    }

    const getText = (iteams) => {
        setText(iteams)
        setLiopen(false)
    }


    return (
        //in this two class one left which has image searchbar and icon and right has sign in cart image,carticon and avtar
        <header>
            <nav>
                <div className="left">
                    {/* //////////////////////////////////// */}
                    <IconButton className="hamburgur" onClick={handelopen}> <MenuIcon style={{ color: "#fff" }} /> </IconButton>
                    {/* here define the right header open={true} */}
                    <Drawer open={dropen} onClose={handleClosedr} > <Rightheader userlog={logoutuser} logclose={handleClosedr} /> </Drawer>
                    {/* ///////////////////////////////////////////// */}
                    <div className="navlogo"> <NavLink to="/"> <img src="./amazon_PNG25.png" alt="logo" /> </NavLink> </div>
                    <div className="nav_searchbaar">
                        <input type="text" name="" onChange={(e) => getText(e.target.value)} placeholder="Search Your Products" />
                        {/* <div className="search_icon"> <i className="fas fa-search" id="search"></i> </div> */}
                        <div className="search_icon"> <SearchIcon id="search" /></div>
                        {
                            text &&
                            <List className="extrasearch" hidden={liopen}>
                                {
                                    products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
                                        <ListItem> <NavLink to={`/getproductsone/${product.id}`} onClick={() => setLiopen(true)}> {product.title.longTitle} </NavLink>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        }
                    </div>
                </div>
                <div className="right">
                    <div className="nav_btn"> <NavLink to="/login">Sign in</NavLink> </div>
                    <div className='cart_btn'>
                        {
                            account ? <NavLink to="/buynow">
                                <Badge badgeContent={account.carts.length} color="secondary"> <ShoppingCartIcon id="icon" /> </Badge></NavLink>
                                :
                                <NavLink to="/login">
                                    <Badge badgeContent={0} color="secondary"> <ShoppingCartIcon id="icon" /> </Badge>  </NavLink>
                        }
                        <ToastContainer />
                        <p>Cart</p>
                    </div>

                    {
                        account ?
                            <Avatar className="avtar2"
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            // onClick={handleClick} title={account.fname.toUpperCase()}
                            >{account.fname[0].toUpperCase()}</Avatar> :
                            <Avatar className="avtar"
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick} ></Avatar>
                    }

                    { <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        {
                            account ? <MenuItem onClick="handleClose();logoutuser();" ><LogoutIcon style={{ fontSize: 16, marginRight: 3 }} />Logout</MenuItem> : ""
                        }
                    </Menu> } 
                   
                </div>

            </nav>
        </header>
    )
}

export default Navbaar;

