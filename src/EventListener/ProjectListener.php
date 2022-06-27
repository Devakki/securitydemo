<?php

namespace App\EventListener;

use DateTime;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

/**
 * Class ProjectListener
 * @package App\EventListener
 */
class ProjectListener
{
    /**
     * @var TokenStorageInterface
     */
    private TokenStorageInterface $tokenStorage;

    /**
     * ProjectListener constructor.
     *
     * @param TokenStorageInterface $tokenStorage
     */
    public function __construct(TokenStorageInterface $tokenStorage)
    {
        $this->tokenStorage = $tokenStorage;
    }

    /**
     * @param LifecycleEventArgs $args
     *
     * @return void
     */
    public function prePersist(LifecycleEventArgs $args):void
    {
        $entity = $args->getEntity();
        if (is_null($this->tokenStorage->getToken())) {
            return;
        }
        if (method_exists($entity, 'setCreatedAt')) {
            $entity->setCreatedAt(new DateTime());
        }
    }

    /**
     * @param PreUpdateEventArgs $args
     *
     * @return void
     */
    public function preUpdate(PreUpdateEventArgs $args):void
    {
        $entity = $args->getEntity();
        if (is_null($this->tokenStorage->getToken())) {
            return;
        }
        if (method_exists($entity, 'setDateUpdated')) {
            $entity->setDateUpdated(new DateTime());
        }
    }
}
