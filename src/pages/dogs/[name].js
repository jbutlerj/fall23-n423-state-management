import React from "react";
import { useRouter } from "next/router";
import { Image, Loader } from "semantic-ui-react";
import styles from "@/styles/Dynamic.module.css";

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
                        <div className={styles.container}>
                            <div className={styles.left}>
                                <Image src={dogInfo.url} />
                            </div>
                            <div className={styles.right}>
                                <div className={styles.top}>
                                    <h1>{dogInfo.breeds[0].name}</h1>
                                </div>
                                <div className={styles.bottom}>
                                    <h3>
                                        Height:{" "}
                                        {dogInfo.breeds[0].height.imperial}{" "}
                                        inches
                                    </h3>
                                    <h3>
                                        Weight:{" "}
                                        {dogInfo.breeds[0].weight.imperial} lbs.
                                    </h3>
                                    <h3>
                                        Temperament:{" "}
                                        {dogInfo.breeds[0].temperament}
                                    </h3>
                                    <h3>
                                        Life Expectancy:{" "}
                                        {dogInfo.breeds[0].life_span}
                                    </h3>
                                </div>
                            </div>
                        </div>
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
