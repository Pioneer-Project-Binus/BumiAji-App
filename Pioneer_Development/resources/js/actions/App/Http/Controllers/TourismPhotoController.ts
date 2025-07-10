import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TourismPhotoController::show
 * @see app/Http/Controllers/TourismPhotoController.php:0
 * @route '/foto-wisata/{slug}'
 */
const showb24247d3d58043cd5cce002f328e35f9 = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showb24247d3d58043cd5cce002f328e35f9.url(args, options),
    method: 'get',
})

showb24247d3d58043cd5cce002f328e35f9.definition = {
    methods: ['get','head'],
    url: '/foto-wisata/{slug}',
}

/**
* @see \App\Http\Controllers\TourismPhotoController::show
 * @see app/Http/Controllers/TourismPhotoController.php:0
 * @route '/foto-wisata/{slug}'
 */
showb24247d3d58043cd5cce002f328e35f9.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slug: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    slug: args[0],
                }
    }

    const parsedArgs = {
                        slug: args.slug,
                }

    return showb24247d3d58043cd5cce002f328e35f9.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismPhotoController::show
 * @see app/Http/Controllers/TourismPhotoController.php:0
 * @route '/foto-wisata/{slug}'
 */
showb24247d3d58043cd5cce002f328e35f9.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showb24247d3d58043cd5cce002f328e35f9.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TourismPhotoController::show
 * @see app/Http/Controllers/TourismPhotoController.php:0
 * @route '/foto-wisata/{slug}'
 */
showb24247d3d58043cd5cce002f328e35f9.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: showb24247d3d58043cd5cce002f328e35f9.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TourismPhotoController::show
 * @see app/Http/Controllers/TourismPhotoController.php:0
 * @route '/tourism-photos/{slug}'
 */
const show28bf218d1173e539a49b2c739135e498 = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show28bf218d1173e539a49b2c739135e498.url(args, options),
    method: 'get',
})

show28bf218d1173e539a49b2c739135e498.definition = {
    methods: ['get','head'],
    url: '/tourism-photos/{slug}',
}

/**
* @see \App\Http\Controllers\TourismPhotoController::show
 * @see app/Http/Controllers/TourismPhotoController.php:0
 * @route '/tourism-photos/{slug}'
 */
show28bf218d1173e539a49b2c739135e498.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slug: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    slug: args[0],
                }
    }

    const parsedArgs = {
                        slug: args.slug,
                }

    return show28bf218d1173e539a49b2c739135e498.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismPhotoController::show
 * @see app/Http/Controllers/TourismPhotoController.php:0
 * @route '/tourism-photos/{slug}'
 */
show28bf218d1173e539a49b2c739135e498.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show28bf218d1173e539a49b2c739135e498.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TourismPhotoController::show
 * @see app/Http/Controllers/TourismPhotoController.php:0
 * @route '/tourism-photos/{slug}'
 */
show28bf218d1173e539a49b2c739135e498.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show28bf218d1173e539a49b2c739135e498.url(args, options),
    method: 'head',
})

export const show = {
    '/foto-wisata/{slug}': showb24247d3d58043cd5cce002f328e35f9,
    '/tourism-photos/{slug}': show28bf218d1173e539a49b2c739135e498,
}

/**
* @see \App\Http\Controllers\TourismPhotoController::index
 * @see app/Http/Controllers/TourismPhotoController.php:17
 * @route '/tourism-photos'
 */
export const index = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ['get','head'],
    url: '/tourism-photos',
}

/**
* @see \App\Http\Controllers\TourismPhotoController::index
 * @see app/Http/Controllers/TourismPhotoController.php:17
 * @route '/tourism-photos'
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismPhotoController::index
 * @see app/Http/Controllers/TourismPhotoController.php:17
 * @route '/tourism-photos'
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TourismPhotoController::index
 * @see app/Http/Controllers/TourismPhotoController.php:17
 * @route '/tourism-photos'
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TourismPhotoController::create
 * @see app/Http/Controllers/TourismPhotoController.php:59
 * @route '/tourism-photos/create'
 */
export const create = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ['get','head'],
    url: '/tourism-photos/create',
}

/**
* @see \App\Http\Controllers\TourismPhotoController::create
 * @see app/Http/Controllers/TourismPhotoController.php:59
 * @route '/tourism-photos/create'
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismPhotoController::create
 * @see app/Http/Controllers/TourismPhotoController.php:59
 * @route '/tourism-photos/create'
 */
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TourismPhotoController::create
 * @see app/Http/Controllers/TourismPhotoController.php:59
 * @route '/tourism-photos/create'
 */
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TourismPhotoController::store
 * @see app/Http/Controllers/TourismPhotoController.php:71
 * @route '/tourism-photos'
 */
export const store = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ['post'],
    url: '/tourism-photos',
}

/**
* @see \App\Http\Controllers\TourismPhotoController::store
 * @see app/Http/Controllers/TourismPhotoController.php:71
 * @route '/tourism-photos'
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismPhotoController::store
 * @see app/Http/Controllers/TourismPhotoController.php:71
 * @route '/tourism-photos'
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TourismPhotoController::archivedIndex
 * @see app/Http/Controllers/TourismPhotoController.php:223
 * @route '/tourism-photos/archived'
 */
export const archivedIndex = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: archivedIndex.url(options),
    method: 'get',
})

archivedIndex.definition = {
    methods: ['get','head'],
    url: '/tourism-photos/archived',
}

/**
* @see \App\Http\Controllers\TourismPhotoController::archivedIndex
 * @see app/Http/Controllers/TourismPhotoController.php:223
 * @route '/tourism-photos/archived'
 */
archivedIndex.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return archivedIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismPhotoController::archivedIndex
 * @see app/Http/Controllers/TourismPhotoController.php:223
 * @route '/tourism-photos/archived'
 */
archivedIndex.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: archivedIndex.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TourismPhotoController::archivedIndex
 * @see app/Http/Controllers/TourismPhotoController.php:223
 * @route '/tourism-photos/archived'
 */
archivedIndex.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: archivedIndex.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TourismPhotoController::restore
 * @see app/Http/Controllers/TourismPhotoController.php:247
 * @route '/tourism-photos/{slug}/restore'
 */
export const restore = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: restore.url(args, options),
    method: 'put',
})

restore.definition = {
    methods: ['put'],
    url: '/tourism-photos/{slug}/restore',
}

/**
* @see \App\Http\Controllers\TourismPhotoController::restore
 * @see app/Http/Controllers/TourismPhotoController.php:247
 * @route '/tourism-photos/{slug}/restore'
 */
restore.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slug: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    slug: args[0],
                }
    }

    const parsedArgs = {
                        slug: args.slug,
                }

    return restore.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismPhotoController::restore
 * @see app/Http/Controllers/TourismPhotoController.php:247
 * @route '/tourism-photos/{slug}/restore'
 */
restore.put = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: restore.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\TourismPhotoController::deletePermanent
 * @see app/Http/Controllers/TourismPhotoController.php:258
 * @route '/tourism-photos/{slug}/delete-permanent'
 */
export const deletePermanent = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: deletePermanent.url(args, options),
    method: 'delete',
})

deletePermanent.definition = {
    methods: ['delete'],
    url: '/tourism-photos/{slug}/delete-permanent',
}

/**
* @see \App\Http\Controllers\TourismPhotoController::deletePermanent
 * @see app/Http/Controllers/TourismPhotoController.php:258
 * @route '/tourism-photos/{slug}/delete-permanent'
 */
deletePermanent.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slug: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    slug: args[0],
                }
    }

    const parsedArgs = {
                        slug: args.slug,
                }

    return deletePermanent.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismPhotoController::deletePermanent
 * @see app/Http/Controllers/TourismPhotoController.php:258
 * @route '/tourism-photos/{slug}/delete-permanent'
 */
deletePermanent.delete = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: deletePermanent.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\TourismPhotoController::edit
 * @see app/Http/Controllers/TourismPhotoController.php:129
 * @route '/tourism-photos/{slug}/edit'
 */
export const edit = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '/tourism-photos/{slug}/edit',
}

/**
* @see \App\Http\Controllers\TourismPhotoController::edit
 * @see app/Http/Controllers/TourismPhotoController.php:129
 * @route '/tourism-photos/{slug}/edit'
 */
edit.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slug: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    slug: args[0],
                }
    }

    const parsedArgs = {
                        slug: args.slug,
                }

    return edit.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismPhotoController::edit
 * @see app/Http/Controllers/TourismPhotoController.php:129
 * @route '/tourism-photos/{slug}/edit'
 */
edit.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TourismPhotoController::edit
 * @see app/Http/Controllers/TourismPhotoController.php:129
 * @route '/tourism-photos/{slug}/edit'
 */
edit.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TourismPhotoController::update
 * @see app/Http/Controllers/TourismPhotoController.php:141
 * @route '/tourism-photos/{slug}'
 */
export const update = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ['post'],
    url: '/tourism-photos/{slug}',
}

/**
* @see \App\Http\Controllers\TourismPhotoController::update
 * @see app/Http/Controllers/TourismPhotoController.php:141
 * @route '/tourism-photos/{slug}'
 */
update.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slug: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    slug: args[0],
                }
    }

    const parsedArgs = {
                        slug: args.slug,
                }

    return update.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismPhotoController::update
 * @see app/Http/Controllers/TourismPhotoController.php:141
 * @route '/tourism-photos/{slug}'
 */
update.post = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: update.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TourismPhotoController::destroy
 * @see app/Http/Controllers/TourismPhotoController.php:202
 * @route '/tourism-photos/{slug}'
 */
export const destroy = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/tourism-photos/{slug}',
}

/**
* @see \App\Http\Controllers\TourismPhotoController::destroy
 * @see app/Http/Controllers/TourismPhotoController.php:202
 * @route '/tourism-photos/{slug}'
 */
destroy.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slug: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    slug: args[0],
                }
    }

    const parsedArgs = {
                        slug: args.slug,
                }

    return destroy.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismPhotoController::destroy
 * @see app/Http/Controllers/TourismPhotoController.php:202
 * @route '/tourism-photos/{slug}'
 */
destroy.delete = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const TourismPhotoController = { show, index, create, store, archivedIndex, restore, deletePermanent, edit, update, destroy }

export default TourismPhotoController