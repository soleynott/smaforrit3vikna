
import { HomeBoards } from "@/src/components/home/home_boards";
import { Toolbar } from "@/src/components/toolbar";
import { View } from "react-native";

export function Home(){
 
  return (
    <View style= {{flex:1}}>
      
      <HomeBoards/>
      <Toolbar name={"Board"}/>
    </View>
  );
}
