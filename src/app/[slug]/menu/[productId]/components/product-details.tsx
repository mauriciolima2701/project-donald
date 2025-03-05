"use client"

import { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
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

    return (
        <div className="relative z-50 rounded-t-3xl p-5 mt-[-1.5rem] flex-auto flex flex-col">
            <div className="flex-auto">
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
                <h2 className="mt-2 text-lg font-semibold">{product.name}</h2>
                <div className="flex items-center justify-between">
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
                <div className="mt-6 space-y-3">
                    <h4 className="font-semibold">Sobre:</h4>
                    <p className="text-sm text-muted-foreground">
                        {product.description}
                    </p>
                </div>

                <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-1.5">
                        <ChefHatIcon size={18} />
                        <h4 className="font-semibold">Ingredientes:</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {product.ingredients}
                    </p>
                </div>

            </div>
            <Button className="mt-6 w-full rounded-full">
                Adicionar à sacola
            </Button>
        </div>
    );
}

export default ProductDetails;