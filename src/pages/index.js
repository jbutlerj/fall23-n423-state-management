import React from "react";
import { Grid, Button, Header } from "semantic-ui-react";
import DogImage from "@/components/DogImage";
import useAppState from "@/useHooks/useAppState";

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
            <Grid columns="1">
                <Grid.Column>
                    <Header as="h1">Random Dogs</Header>
                </Grid.Column>
                <Grid.Column>
                    <Button
                        content="Reload Dogs"
                        icon="sync"
                        color="blue"
                        onClick={getDogImages}
                    />
                </Grid.Column>
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
        </>
    );
}
