import Site from "../entities/Site";

export default abstract class SiteRepository {
    abstract save(site: Site): Promise<Site | undefined>;

    abstract findById(id: string): Promise<Site | undefined>;

    abstract getAll(): Promise<Site[] | undefined>;

    abstract deleteSite(id: string): Promise<Site | undefined>;
}
