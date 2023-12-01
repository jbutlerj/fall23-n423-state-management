import React from "react";
import { Grid, Button, Header, GridColumn } from "semantic-ui-react";
import DogImage from "@/components/DogImage";
import useAppState from "@/useHooks/useAppState";
import styles from "@/styles/Home.module.css";

export default function Home() {
    const [dogImages, setDogImages] = React.useState([]);
    const appState = useAppState();

    console.log(appState);

    function getDogImages() {
        fetch(
            `https://api.thedogapi.com/v1/images/search?mime_types=jpg,png&format=json&has_breeds=true&order=RANDOM&limit=10`
        )
            .then((r) => r.json())
            .then((r) => {
                appState.updateAppState({ dogImages: r });
            })
            .catch((e) => {
                console.warn(e);
            });
    }

    function saveDogImage(selectedDog) {
        appState.updateAppState({
            favoriteDogs: appState.favoriteDogs.concat(selectedDog),
        });
    }

    return (
        <>
            <div className={styles.hero}>
                <Grid>
                    <Grid.Column className={styles.left} width={10}>
                        <h1 className={styles.wordmark}>The Doggy Database</h1>
                    </Grid.Column>
                </Grid>
            </div>
            <div className={styles.subheading}>
                <Grid>
                    <Grid.Row columns="2">
                        <Grid.Column width={13}>
                            <h5>
                                Click the "Reload Dogs" button for a selection
                                of 10 pups to choose from, them click on a dog
                                to save it to your favorites.
                            </h5>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Button
                                content="Reload Dogs"
                                icon="sync"
                                color="blue"
                                onClick={getDogImages}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
            <div className={styles.imageGrid}>
                <Grid>
                    <Grid.Row columns="5">
                        {appState.dogImages.map((dogImage) => {
                            return (
                                <DogImage
                                    key={dogImage.id}
                                    src={dogImage.url}
                                    onClick={() => saveDogImage(dogImage)}
                                />
                            );
                        })}
                    </Grid.Row>
                </Grid>
            </div>
        </>
    );
}
