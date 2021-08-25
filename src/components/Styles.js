import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height:100vh;
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content:center;

    img{
        margin: 0 auto;
        width:180px;
        height:180px;
    }
`;

export const Input = styled.input`
    font-family:'Lexend Deca';
    box-sizing:border-box;
    font-weight:400;
    font-size:20px;
    border-radius:5px;
    height:45px;
    width:303px;
    padding-left:11px;
    border: 1px solid #d5d5d5;
    outline: none;
    margin-bottom: 10px;

    ::-webkit-input-placeholder  { 
        color: #DBDBDB;
    }
`;

export const Button = styled.button`
    display:flex;
    justify-content:center;
    align-items:center;
    color:#FFFFFF;
    font-family:'Lexend Deca';
    font-size:21px;
    box-sizing:border-box;
    font-weight:400;
    background-color:#52b6ff;
    border-radius:4.63636px;
    height:45px;
    width:303px;
    border:none;
    outline:none;
    opacity: ${props => props.opacityWhenDisabled? "0.7": "1"};
`;
export const Redirect = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    height:17px;
    margin-top:25px;

    p{
        font-family:'Lexend Deca';
        font-weight:400;
        font-size:14px;
        color:#52b6ff;
        text-decoration-line:underline;
    }
`;

export const FormHolder = styled.form`
    display:flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin:0 auto;
`;