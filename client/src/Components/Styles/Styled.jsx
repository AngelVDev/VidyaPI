import { Link } from "react-router-dom";
import styled from "styled-components";

export const Button1 = styled.button`
  padding: 0.8em 1.8em;
  border: 2px solid #00ffff;
  position: relative;
  overflow: hidden;
  background-color: transparent;
  text-align: center;
  text-transform: uppercase;
  font-size: 16px;
  transition: 0.3s;
  z-index: 1;
  font-family: inherit;
  color: #8edfff;
  &:before {
    content: "";
    width: 0;
    height: 300%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    background: #00ffff;
    transition: 0.5s ease;
    display: block;
    z-index: -1;
  }
  &:hover&:before {
    width: 105%;
  }
  &:hover {
    color: #ffffff;
  }
`;
export const Button2 = styled.button`
  margin: 5px;
  padding: 8px 10px;
  border: 2px solid #ff009d;
  position: relative;
  overflow: hidden;
  background-color: transparent;
  text-align: center;
  text-transform: uppercase;
  font-size: 16px;
  transition: 0.3s;
  z-index: 1;
  font-family: inherit;
  color: #ff7bcc;
  &:before {
    content: "";
    width: 0;
    height: 300%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    background: #ff009d;
    transition: 0.5s ease;
    display: block;
    z-index: -1;
  }
  &:hover&:before {
    width: 105%;
  }
  &:hover {
    color: #ffffff;
  }
`;
export const InputF = styled.input`
  max-width: 190px;
  height: 30px;
  border: 2px solid transparent;
  outline: none;
  border-bottom: 2px solid #3f3f3f;
  caret-color: #3f3f3f;
  background-color: #212121;
  padding: 5px;
  transition: 0.5s linear;
  font-family: monospace;
  letter-spacing: 1px;

  &:focus {
    border: 2px solid #fa4753;
    caret-color: #fa4753;
    color: #fa4753;
    box-shadow: 4px 4px 10px #070707;
  }

  &:focus&:placeholder {
    color: #fa4753;
  }
`;
export const Select1 = styled.select`
  background-color: #54006e5e;
  color: #7fe5ff;
  border-radius: 20px;
  border: skyblue;
  text-shadow: -2px 0px 3px rgba(100, 231, 255, 0.88), 2px 0px 3px #ff0046;
  &:focus {
    background-color: #430069;
  }
`;
export const ButtonT = styled.button`
  margin: 5px;
  padding: 8px 10px;
  border: 2px solid #000000;
  position: relative;
  overflow: hidden;
  background-color: transparent;
  text-align: center;
  text-transform: uppercase;
  font-size: 15px;
  transition: 0.3s;
  z-index: 1;
  font-family: inherit;
  color: #ffffff;
  &:before {
    content: "";
    width: 0;
    height: 300%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    background: #000000;
    transition: 0.5s ease;
    display: block;
    z-index: -1;
  }
  &:hover&:before {
    width: 105%;
  }
  &:hover {
    text-shadow: -2px 0px 3px rgba(100, 231, 255, 0.88), 2px 0px 3px #ff0046;
  }
`;
export const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  &:hover {
    text-shadow: -2px 0px 3px rgba(100, 231, 255, 0.88), 2px 0px 3px #ff0046;
  }
`;
