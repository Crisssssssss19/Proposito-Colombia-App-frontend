import {Image, View} from "react-native";

export default function PropositosHeader (){
    return(
        <>

            <View style={{ alignItems:"flex-end", justifyContent: "center"}}>
               <Image style={{width: 110, height:60, margin:10, padding:10}} source={require("../assets/LogoPropoL_Negro.png")}/>
            </View>
        </>
    )
}