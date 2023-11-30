import React from "react";
import { Grid, Button, Image, Header, Popup } from "semantic-ui-react";
import DogImage from "@/components/DogImage";

export default function Home() {
    const [dogImages, setDogImages] = React.useState([]);

    function getDogImages() {
        fetch(
            `https://api.thedogapi.com/v1/images/search?mime_types=jpg,png&format=json&has_breeds=true&order=RANDOM&limit=10`
        )
            .then((r) => r.json())
            .then((r) => {
                setDogImages(r);
            })
            .catch((e) => {
                console.warn(e);
            });
    }

    return (
        <>
            <h1>Home</h1>
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
                    {dogImages.map((dogImage) => {
                        return (
                            <DogImage key={dogImage.id} src={dogImage.url} />
                        );
                    })}
                </Grid.Row>
            </Grid>
        </>
    );
}
