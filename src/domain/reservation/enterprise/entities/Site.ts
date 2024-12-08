export default class Site {
    private id: string;
    private ownerId: string;
    private name: string; 
    private rating: number;
    private pricePerDay: number;
    private location: string; 
    private description: string; 
    private images: string[]; 
    private createdAt: Date;
    private updatedAt: Date;

    constructor(id: string, ownerId: string, name: string, rating: number, pricePerDay: number, location: string, description: string, images: string[], createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.ownerId = ownerId;
        this.name = name;
        this.rating = rating;
        this.pricePerDay = pricePerDay;
        this.location = location;
        this.description = description;
        this.images = images;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public getId(): string {
        return this.id;
    }

    public getOwnerId(): string {
        return this.ownerId;
    }

    public getName(): string {
        return this.name;
    }

    public getRating(): number {
        return this.rating;
    }

    public getPricePerDay(): number {
        return this.pricePerDay;
    }

    public getLocation(): string {
        return this.location;
    }

    public getDescription(): string {
        return this.description;
    }

    public getImages(): string[] {
        return this.images;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getUpdatedAt(): Date {
        return this.updatedAt;
    }
}
