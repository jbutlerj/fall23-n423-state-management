import React from "react";
import { useRouter } from "next/router";
import { Card, Image, Loader } from "semantic-ui-react";

export default function DogDetails() {
    const router = useRouter();
    const [dogInfo, setDogInfo] = React.useState({ loading: true, breeds: [] });

    React.useEffect(function () {
        if (dogInfo.id !== router.query.name && router.query.name) {
            console.log("Data Missing", router.query.name);
            fetch(`https://api.thedogapi.com/v1/images/${router.query.name}`)
                .then((r) => r.json())

                .then(function (r) {
                    setDogInfo(r);
                })
                .catch((e) =>
                    setDogInfo({
                        loading: false,
                        id: router.query.name,
                        breeds: [],
                    })
                );
        }
    });

    return (
        <>
            <Loader active={dogInfo.loading} />
            {
                // if this statement
                dogInfo.id ? (
                    // true - then do this
                    <>
                        <Image src={dogInfo.url} />
                        <h1>Breed: {dogInfo.breeds[0].name}</h1>
                        <h1>Height: {dogInfo.breeds[0].height.imperial}</h1>
                        <h1>Weight: {dogInfo.breeds[0].weight.imperial}</h1>
                    </>
                ) : (
                    // false - else do this
                    <>
                        {dogInfo.id !== router.query.name ? (
                            <h2>Serching for Details</h2>
                        ) : (
                            <h2>Details not Found</h2>
                        )}
                    </>
                )
            }
        </>
    );
}
