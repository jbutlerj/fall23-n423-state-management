import React from "react";
import { useRouter } from "next/router";
import { Image } from "semantic-ui-react";

export default function DogDetails() {
    const router = useRouter();
    const [dogInfo, setDogInfo] = React.useState({ loading: true });

    React.useEffect(function () {
        if (dogInfo.searchName !== router.query.name && router.query.name) {
            console.log("Data Missing");
            fetch(`https://api.thedogapi.com/v1/images/${router.query.name}`)
                .then((r) => r.json())

                .then(function (r) {
                    const dogData = r;

                    console.log(dogData);

                    dogInfo.searchName = router.query.name;

                    setDogInfo(dogData.breeds[0]);
                })
                .catch((e) =>
                    setDogInfo({
                        loading: false,
                        searchName: router.query.name,
                    })
                );
        }
    });

    return (
        <>
            <h1>Dog Breed: {dogInfo.name} </h1>
        </>
    );
}
