import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "./ui/card"

  interface CalculatedCardsProps {
    cardTitle: string;
    cardDescription: string;
    cardContent: number;
  }

  export function CalculatedCards(props: CalculatedCardsProps) {

    const cardContentFormat = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(props.cardContent)

    return(
        <>
        <Card className="h-40">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-nowrap">{props.cardTitle}</CardTitle>
            <CardDescription className="text-sm font-small text-nowrap">{props.cardDescription}</CardDescription>
          </CardHeader>
          <CardContent className="font-semibold">
            <p>{cardContentFormat}</p>
          </CardContent>
       </Card>
        </>
    );


  }