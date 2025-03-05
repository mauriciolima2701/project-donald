"use client"

import { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/helpers/format-currency";

interface ProductDetailsProps {
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: {
                select: {
                    name: true,
                    avatarImageUrl: true
                }
            }
        };
    }>;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
    const [quantity, setQuantity] = useState<number>(0)

    const imageRestaurant = product.restaurant.avatarImageUrl
    const altImageRestaurant = product.restaurant.name

    const handleDecreaseQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1)
        }
    }

    const handleIncreaseQuantity = () => {
        if (quantity >= 0) {
            setQuantity(quantity + 1)
        }
    }

    const renderIngredients = () => {
        return (
            <ul className="list-disc px-5 pb-6 text-sm text-muted-foreground">
                {product.ingredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                ))}
            </ul>)
    }

    return (
        <div className="relative z-50 rounded-t-3xl p-5 mt-[-1.5rem] flex-auto flex flex-col overflow-hidden">
            <div className="flex-auto overflow-hidden">
                <div className="flex items-center gap-1.5">
                    <Image
                        src={imageRestaurant}
                        alt={altImageRestaurant}
                        height={16}
                        width={16}
                        className="rounded-full"
                    />
                    <p className="text-xs text-muted-foreground">
                        {product.restaurant.name}
                    </p>
                </div>
                <h2 className="mt-2 text-xl font-semibold">{product.name}</h2>
                <div className="flex items-center justify-between mt-3">
                    <h3 className="text-xl font-semibold">
                        {formatCurrency(product.price)}
                    </h3>
                    <div className="flex items-center gap-3 text-center">
                        <Button
                            variant="outline"
                            className="size-7 rounded-xl"
                            onClick={handleDecreaseQuantity}
                        >
                            <ChevronLeftIcon />
                        </Button>
                        <p className="w-4">{quantity}</p>
                        <Button
                            variant="destructive"
                            className="size-7 rounded-xl"
                            onClick={handleIncreaseQuantity}
                        >
                            <ChevronRightIcon />
                        </Button>
                    </div>
                </div>
                <ScrollArea className="h-full">
                    <div className="mt-6 space-y-3">
                        <h4 className="font-semibold">Sobre:</h4>
                        <p className="text-sm text-muted-foreground">
                            {product.description}
                        </p>
                    </div>

                    <div className="mt-6 mb-4 space-y-3">
                        <div className="flex items-center gap-1.5">
                            <ChefHatIcon size={18} />
                            <h4 className="font-semibold">Ingredientes:</h4>
                        </div>
                        {renderIngredients()}
                    </div>
                </ScrollArea>

            </div>
            <Button className="mt-4 w-full rounded-full">
                Adicionar à sacola
            </Button>
        </div>
    );
}

export default ProductDetails;