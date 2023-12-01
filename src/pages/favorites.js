import React from "react";
import useAppState from "@/useHooks/useAppState";
import { Grid, Button, Header, Image } from "semantic-ui-react";
import DogFav from "@/components/DogFav";
import { useRouter } from "next/router";

export default function Favorites() {
    const appState = useAppState();
    const router = useRouter();

    function changeName() {
        const titles = ["Tall", "Short", "Old"];
        const randomTitleIndex = Math.floor(Math.random() * titles.length);

        appState.updateAppState({
            user: `Jerry the ${titles[randomTitleIndex]} Guy`,
        });
    }

    return (
        <>
            <Grid columns={1}>
                <Grid.Column>
                    <Header as="h1">{appState.user}'s Favorites</Header>
                </Grid.Column>
                <Grid.Column>
                    <Button
                        content="Change Name"
                        color="purple"
                        icon="sync"
                        onClick={changeName}
                    />
                </Grid.Column>
                <Grid.Row columns="5">
                    {appState.favoriteDogs.map((dog) => {
                        return (
                            <DogFav
                                key={dog.id}
                                src={dog.url}
                                onClick={() => router.push(`/dogs/${dog.id}`)}
                            />
                        );
                    })}
                </Grid.Row>
            </Grid>
        </>
    );
}
