import { axiosClient } from '@/services/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, View } from 'react-native';

type SliderTypes = {
    name: string;
    Image: { url: string; };
}

export default function Slider() {
    useEffect(() => {
        GetSlider();
    }, []);



    const [slider, setSlider] = useState<SliderTypes[]>();
    const GetSlider = async () => {

        const result = await axiosClient.get('/slider-images?populate=*');
        // console.log( JSON.stringify(result.data.data, null, 2));
        // console.log("result.data.data.[1].image.url: " + `${result?.data?.data[1].image.url}`);
        // console.log("result.data.data.[1].ima ge.name: " + result?.data?.data[1].Name);
        // console.log("ENV: " + process.env.EXPO_PUBLIC_BASE_URL);
        setSlider(result?.data?.data);
    };
    return (
        <View style={{ marginTop: 8 }}>
            <FlatList
                data={slider}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                pagingEnabled
                renderItem={({ item, index }) => (
                    <View>
                        <Image
                            source={{ uri: item?.Image?.url }}
                            style={{ width: Dimensions.get('screen').width * 0.85, height: 200, gap: 10, margin: 10, borderRadius: 10 }}
                        />

                    </View>
                )}
            />
        </View>
    )
}

