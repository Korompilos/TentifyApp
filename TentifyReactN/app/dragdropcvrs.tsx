import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { dragImages } from '../utils/constants'; // Adjust the path as necessary
import {
    GestureHandlerRootView,
    Gesture,
    GestureDetector,
} from 'react-native-gesture-handler';
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';
import { panGestureHandlerCustomNativeProps } from 'react-native-gesture-handler/lib/typescript/handlers/PanGestureHandler';
import { transform } from '@babel/core';



const DragDrop = () => {

    const[draggedImages, setDraggedImages] = useState(dragImages)
    
    const translationValueX = draggedImages.map(() => useSharedValue(0));
    const translationValueY = draggedImages.map(() => useSharedValue(0));

    const [dropzoneLayout, setDropzoneLayout] = useState<{ x: number; y: number; width: number; height: number }>({ x: 0, y: 0, width: 0, height: 0 });

    const [dragLayout, setDragLayout] = useState<{ x: number; y: number; width: number; height: number }>({ x: 0, y: 0, width: 0, height: 0 });


    const [imageLayout,setImageLayout]=useState<any>([])

    const createPanGestureHandler=(index:number)=>{
        return Gesture.Pan()
        .onUpdate((event)=>{
            translationValueX[index].value = event.translationX;
            translationValueY[index].value = event.translationY

        }).onEnd((event)=>{

            const dropX=dragLayout.width+ dropzoneLayout.x
            const dropY=dropzoneLayout.y

            if(imageLayout[index] &&
                imageLayout[index].x + event.translationX >=dropX && 
                imageLayout[index].x + event.translationX + imageLayout[index].width <= dropX + dropzoneLayout.width &&
                imageLayout[index].y + event.translationY >= dropY &&
                imageLayout[index].y + event.translationY + imageLayout[index].height <= dropY + dropzoneLayout.height
            ) {

            } else {
                translationValueX[index].value = withSpring(0);
                translationValueY[index].value = withSpring(0)
            }

        })
    }
    const panGestureHandler = draggedImages.map((item, index) => createPanGestureHandler(index))
    
    const animatedStyles = (index: number) =>
        useAnimatedStyle(() => {
            return {
                transform: [
                    { translateX: translationValueX[index]?.value ?? 0 },
                    { translateY: translationValueY[index]?.value ?? 0 },
                ],
            } as const;
        });


    


    
    return (
    <View style= {styles.container}>
        <View style= {styles.mainView}>
            <View style= {styles.dragView} onLayout={(event)=>{
                const {width,x,y,height}= event.nativeEvent.layout
                setDragLayout( { width, x, y, height } )
            }}>
                {draggedImages.map((item,index)=>{
                    return(
                         <GestureDetector key = {index} gesture={panGestureHandler[index]}>
                            <Animated.Image
                                onLayout={(event) => {
                                    const { width, x, y, height } = event.nativeEvent.layout;
                                    const updatedLayout: any = [...imageLayout];
                                    updatedLayout[index] = { width, x, y, height };
                                    setImageLayout(updatedLayout);
                                }}
                                source={item.path}
                                style={[styles.imageView, animatedStyles(index) as any]}
                            />

                         </GestureDetector>
                            
                    )
                    
                })}
            </View>

                <View style={styles.dropView }>

                    <View onLayout={(event) => {
                        const { width, x, y, height } = event.nativeEvent.layout
                        
                        setDropzoneLayout({ width, x, y, height })
                    }} style={styles.dropZone}>

                    </View>

                </View>
        </View>
      
    </View>
  )
}

export default DragDrop

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mainView: {
        flex: 1,
        flexDirection: "row"
    },
    dragView: {
        height: hp(100),
        width: wp(40),
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dropView: {
        height: hp(100),
        width: wp(40),
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dropZone: {
        height: hp(50),
        width: wp(50),
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageView: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    }
})